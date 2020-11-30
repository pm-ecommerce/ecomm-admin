export class Employee {
    public id;
    public name;
    public email;
    public role;
    public password;
    public passwordConfirmation;

    constructor(employee: Employee = {} as Employee) {
        this.id = employee.id;
        this.name = employee.name || '';
        this.email = employee.email || '';
        this.role = employee.role || {};
        this.password = employee.password || '';
        this.passwordConfirmation = employee.passwordConfirmation || '';
    }
}