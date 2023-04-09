import { encryptPassword, makeSalt } from "./cryptogram.util"

/**
 * 生成加密后的密码
 * @param password -原始密码
 * @returns {object} {salt,hashPassword}
 */
export const getPassword = (password:string) => {
    const salt = makeSalt()
    const hashPassword = encryptPassword(password, salt)
    return {
        salt, hashPassword
    }
}