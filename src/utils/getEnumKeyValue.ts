const getEnumKeyValue = (enumObj: any, value: number) => {
    return Object.keys(enumObj).find(key => enumObj[key] === value);
}

export default getEnumKeyValue;