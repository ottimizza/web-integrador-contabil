export class FileUtils {

  public static rename(file: File, newName: string) {
    const blob = file.slice(0, file.size, file.type);
    return new File([blob], newName, { type: file.type });
  }

}
