export interface User {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    phone_number: string | null;
    default_currency: number;
    updated_at: string;
}