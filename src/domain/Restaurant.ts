export default class Restaurant {
  constructor(
    public readonly username: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly password: string,
    public readonly address: string,
    public readonly has_service_tax: boolean,
    public readonly canceled_at: string
  ) {}
}
