// Represents a user in the project
export type User = {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'member' | 'viewer';
};

// Represents a task in the project
export type Task = {
    id: string;
    title: string;
    description?: string;
    status: 'pending' | 'in-progress' | 'completed';
    assigneeId?: string;
    dueDate?: string;
};

// Represents a project
export type Project = {
    id: string;
    name: string;
    description?: string;
    ownerId: string;
    members: User[];
    tasks: Task[];
    createdAt: string;
    updatedAt?: string;
};

// Represents a commune
export type Commune = {
    Ma_Tinh: string;
    Ten_Tinh: string;
    Ma_Huyen: string;
    Ten_Huyen: string;
    Ma_Xa: string;
    Ten_Xa: string;
};

// Represents a list of communes
export type ListCommune = Commune[];

// Represents the old address structure
export type OldListAddress = [
    string, // Ma_Tinh
    string, // Ten_Tinh
    string, // Loai_Tinh (e.g., "Tỉnh")
    string, // Ten_Tinh_Khong_Dau
    OldListCommune
];

export type OldWard = [
        string, // Ma_Xa
        string, // Ten_Xa
        string, // Loai_Xa (e.g., "Xã")
        string  // Ten_Xa_Khong_Dau
    ] | [];
export type OldListWard = OldWard[] | [];
export type OldCommunes = [
    string, // Ma_Huyen
    string, // Ten_Huyen
    string, // Loai_Huyen (e.g., "Huyện")
    string, // Ten_Huyen_Khong_Dau
    OldListWard
] | [];
export type OldListCommune = OldCommunes[] | [];


// example of new address value 
// {
//     "ha-noi": {"no":"02","list":["huyen-dong-van",""huyen-quan-ba"],"nodes":{
//         "huyen-dong-van": {"no":"026","list":["xa-van-chai-1","xa-thai-hoc-2"],"nodes":{}},
//         "huyen-quan-ba": {"no":"027","list":["xa-van-chai-3","xa-thai-hoc-4"],"nodes":{}}

export type CategoriesProvince = string[]
export type NewListAddress = {
    [key: string]: {}
}

