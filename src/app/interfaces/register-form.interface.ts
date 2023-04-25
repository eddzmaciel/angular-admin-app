/* 
  las interfaces son como clases tontas que te  sirven para tener ciertas restricciones y forzar
  a que un objecto tenga una estructura especifica
*/

export interface IRegisterForm {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    terms: boolean;
}
