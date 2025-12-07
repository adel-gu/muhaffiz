import { ChapterRecitation, Segment, TokenResponse } from '@quranjs/api';

type Timestamp = {
  verse_key: string;
  timestamp_from: number;
  timestamp_to: number;
  duration: number;
  segments: Segment[];
};

export type ChapterRecitationWithSegments = ChapterRecitation & {
  timestamps: Timestamp[];
};

export class LocalQuranApiClient {
  private clientId: string;
  private authUrl: string;
  private auth: string;
  private apiBaseUrl: string;

  private accessToken: string | null = null;
  private tokenExpiresAt: number | null = null;

  constructor(clientId: string, clientSecret: string, authUrl: string, apiBaseUrl: string) {
    this.clientId = clientId;
    this.authUrl = authUrl;
    this.apiBaseUrl = apiBaseUrl;

    this.auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  }

  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && this.tokenExpiresAt && Date.now() < this.tokenExpiresAt) {
      return this.accessToken;
    }

    const response = await fetch(this.authUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${this.auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials&scope=content',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get access token: ${response.status} - ${errorText}`);
    }

    const data: TokenResponse = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiresAt = Date.now() + data.expires_in * 1000 - 5000; // refresh 5s early
    return this.accessToken;
  }

  async findChapterRecitationById(
    chapterId: string,
    recitationId: string,
    segments: boolean = true,
  ): Promise<ChapterRecitationWithSegments> {
    const token = await this.getAccessToken();

    const url = new URL(`${this.apiBaseUrl}/chapter_recitations/${recitationId}/${chapterId}`);
    if (segments) url.searchParams.append('segments', 'true');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-auth-token': token,
        'x-client-id': this.clientId,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch chapter recitation: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return {
      id: data.audio_file.id,
      audioUrl: data.audio_file.audio_url,
      chapterId: data.audio_file.chapter_id,
      fileSize: data.audio_file.file_size,
      format: data.audio_file.format,
      timestamps: data.audio_file.timestamps,
    };
  }
}

// Helper to create default client from env variables
const createLocalQuranClient = (): LocalQuranApiClient => {
  const clientId = process.env.QURAN_CLIENT_ID;
  const clientSecret = process.env.QURAN_CLIENT_SECRET;
  const authUrl = process.env.QURAN_AUTH_URL;
  const apiBaseUrl = process.env.QURAN_API_BASE_URL;

  if (!clientId) throw new Error('Missing QURAN_CLIENT_ID in environment variables');
  if (!clientSecret) throw new Error('Missing QURAN_CLIENT_SECRET in environment variables');
  if (!authUrl) throw new Error('Missing QURAN_TOKEN_URL in environment variables');
  if (!apiBaseUrl) throw new Error('Missing QURAN_API_URL in environment variables');

  return new LocalQuranApiClient(clientId, clientSecret, authUrl, apiBaseUrl);
};

let LocalQuranClient: LocalQuranApiClient;

export const getLocalQuranClient = (): LocalQuranApiClient => {
  if (!LocalQuranClient) {
    LocalQuranClient = createLocalQuranClient();
  }
  return LocalQuranClient;
};
