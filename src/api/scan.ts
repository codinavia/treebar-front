import { client } from '@/lib/api';
import { Location, ScanResponse } from '@/types/api';

export const aggregate = (barcode: string, ubicacion: Location) =>
    client
        .get<ScanResponse>(
            `/scan/${encodeURIComponent(barcode)}`
        )
        .then((r) => r.data);