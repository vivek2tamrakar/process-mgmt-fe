export const REFRESH_TOKEN = '/users/login-with-refresh-token';
// *********************admin login and password*******************
export const LOGINAPI = '/auth/login';
export const Register = '/users/company';
export const ForgotPassword = '/admin/forget-password';
export const ChangePassword = '/admin/update-password';

// *********************Profile api*******************
export const Userget = '/users/info-id'; //old

// *********************company login then Add groups and get groups*******************
export const AddGroupData = '/group';
export const GetGroupListApi = '/group/list';

// *********************company login then Add Folder*******************
export const AddFolderData = '/folder';

// *********************company login then Add Process*******************
export const AddProcessData = '/process';

// *********************Get all Company members*******************
export const GetCompanyMemberbyID = '/users/list';

// *********************invite members and get in user list*******************
export const InviteUsers = '/users';

// *********************Add and Get assign members in groups*******************
export const AddMemberInGroup = '/assign';
export const GetAssignMembers = '/group/id';

// *********************Delete groups*******************
export const DeleteGroupById = '/group';
