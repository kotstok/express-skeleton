export type UserEditDto = {
  name?: string;
  email?: string;
  passwd?: string;
  isActive?: boolean;
};

export type UserSignUpDto = {
  name: string;
  email: string;
  passwd: string;
  isActive?: boolean;
};
