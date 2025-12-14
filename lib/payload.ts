import { getPayload } from 'payload';
import config from '../payload-config/payload.config';

// Singleton cached payload instance
let cachedPayload: any = null;

export const getLocalPayload = async () => {
    if (!cachedPayload) {
        cachedPayload = await getPayload({ config });
    }
    return cachedPayload;
};
