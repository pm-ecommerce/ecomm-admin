export class EmployeeUpdate {
    public id;
    public name;
    public email;
    public role;

    constructor(employee: EmployeeUpdate = {} as EmployeeUpdate) {
        this.id = employee.id;
        this.name = employee.name || '';
        this.email = employee.email || '';
        this.role = employee.role || {};
    }
}