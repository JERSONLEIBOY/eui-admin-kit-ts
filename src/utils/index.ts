const modules: any = import.meta.glob('../assets/img/*/*', { eager: true });
/**
 *
 * @param folderName 文件夹名称
 * @param imgName 图片名称
 * @param imgType 图片后缀类型
 * @returns
 */
export function getImageUrl(
  imgName: string = '',
  folderName: string = '',
  imgType: string = 'png'
): string {
  const imgPath = `../assets/img/${folderName ? `${folderName}/` : ''}${imgName}.${imgType}`;

  return modules[imgPath].default;
}
