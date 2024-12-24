export interface User {
    id: string,
    username: string,
    email: string,
    permission: permissions,
    src: string
};

enum permissions {
    admin = 'admin',    
    common = 'common'
};