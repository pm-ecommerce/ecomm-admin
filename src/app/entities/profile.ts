export class Profile {
  public id;
  public password;
  public passwordConfirmation;

  constructor(profile: Profile = {} as Profile) {
    this.id = profile.id;
    this.password = profile.password;
    this.passwordConfirmation = profile.passwordConfirmation;
  }
}
