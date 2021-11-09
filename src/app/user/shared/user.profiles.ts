export enum Profiles {
    ROOT,
    ADMIN,
    ANY
}


export function ProfilesValues() {
    const arrvalues: number[] = []
    for (const iterator in Profiles) {
        if (!isNaN((iterator as any))) arrvalues.push(Number(iterator))
    }
    return arrvalues
}
export function ProfilesValid(profile: number) {
    const arrvalues = ProfilesValues()
    const result = arrvalues.findIndex(p => profile == p) != -1
    return result
}