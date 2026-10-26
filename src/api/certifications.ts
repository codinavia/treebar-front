import { client } from '@/lib/api';
import { Certification } from '@/types/api';

export const get = () =>
    client.get<Certification[]>(`/certifications`).then((r) => r.data);