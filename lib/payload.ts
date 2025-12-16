import { getPayload } from 'payload';
import type { Payload } from 'payload';
import config from '../payload-config/payload.config';
import type { Config } from '../payload-config/payload-types';

// Singleton cached payload instance
let cachedPayload: Promise<Payload> | null = null;

export const getLocalPayload = async (): Promise<Payload> => {
    if (!cachedPayload) {
        cachedPayload = getPayload({ config });
    }
    return cachedPayload;
};
