export function TableField(target) {

  return (_target, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log('f(): called')
  }
}
