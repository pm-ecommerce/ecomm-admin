export class Role {
    public id;
    public name;
    public permissions;

    constructor(role: Role = {} as Role) {
        this.id = role.id;
        this.name = role.name || '';
        this.permissions = role.permissions || [];
    }
}