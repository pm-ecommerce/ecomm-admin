export class Permission {
    public id;
    public action;
    public path;
    public name;
    constructor(permission: Permission = {} as Permission) {
        this.id = permission.id;
        this.action = permission.action;
        this.path = permission.path;
        this.name = permission.name;
    }
}