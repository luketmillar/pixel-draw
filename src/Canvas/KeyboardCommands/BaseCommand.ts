export default abstract class BaseCommand {
    public abstract matches(e: KeyboardEvent): boolean
    public abstract do(e: KeyboardEvent): void
}