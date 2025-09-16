import validator from "validator"
import PasswordValidator from "password-validator"
import { ValidationResult } from "@/types/global"

export async function validateUsername(username: string): Promise <ValidationResult[]>{
    console.log('checking if username exists')
    if(username) {
      try {
        const errors: any = []
        //Checking if username already exists     
        const response = await fetch("http://localhost:3000/users/" + username)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        console.log('data.available', data.available)
        //If username is not available
        if(data.available) {
          console.log('username is already in use')
          errors.push({valid: false, error: "Username is already in use"})
        }
        console.log('username', username)
        //Only allowed characters
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
          console.log('Username may only contain letters, numbers, and underscores')
          errors.push({valid: false, error: "Username may only contain\nletters, numbers, and underscores."})
        }

        //No leading or trailing underscore
        if (/^_|_$/.test(username)) {
          console.log('username cannot start or end with an underscore')
          errors.push({valid: false, error: "Username cannot start or end\nwith an underscore."})
        }

        //No consecutive underscores
        if (/__/.test(username)) {
          console.log('username cannot contain consecutive underscores')
          errors.push({valid: false, error: "Username cannot contain\nconsecutive underscores."})
        }

        if(username.length > 20 || username.length < 3){
          errors.push({valid: false, error: "Username must be between 3\nand 20 characters."})
        }

        //No reserverd words
        const reserved = ["admin", "root", "support", "system"];
        if (reserved.includes(username.toLowerCase())) {
          console.log('this username is not allowed')
          errors.push({valid: false, error: "This username is not allowed."})
        }

        if(errors < 1){
          return [{valid: true, error: ""}]
        } else {
          return errors
        }

      } catch (error) {
        console.error('Error fetching users:', error)
        throw new Error('Error fetching users', { cause: error })
      }
    } else {
      return [{ valid: false, error: ""}]
    }
  }

export function validateEmail(newEmail: string, confirmEmail: string, isConfirmField: boolean): ValidationResult {
  // Check if email is valid format
  if (!validator.isEmail(newEmail)) {
    return { valid: false, error: "Invalid email format" }
  }

  // If this is the confirm email field, check if it matches the original email
  if (isConfirmField && newEmail !== confirmEmail) {
    return { valid: false, error: "Emails do not match" }
  }

  return { valid: true, error: "" }
}

export async function validatePassword(newPassword: string, topPassword: string, isConfirmPassword: boolean): Promise<ValidationResult[]> {
  // If this is confirm password validation, only check if passwords match
  if (isConfirmPassword) {
    if (newPassword !== topPassword) {
      return [{valid: false, error: "Passwords do not match"}]
    } else {
      return [{valid: true, error: ""}]
    }
  }

  // Regular password validation
  const schema = new PasswordValidator()
  schema
  .is().min(8)                                    // Minimum length 8
  .is().max(20)                                   // Maximum length 20
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(1)                                // Must have at least 2 digits
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(["Passw0rd", "Password123"])
   
  const errors = schema.validate(newPassword, {list: true}) as string[]
  const result: ValidationResult[] = []
  for(const error of errors){
    switch (error){
        case "min":
          result.push({valid: false, error: "Be at least 8 characters long"})
          break
        case "max":
          result.push({valid: false, error: "Be less than 20 characters"})
          break
        case "uppercase":
          result.push({valid: false, error: "Contain at least one uppercase letter"})
          break
        case "lowercase":
          result.push({valid: false, error: "Contain at least one lowercase letter"})
          break
        case "digits":
          result.push({valid: false, error: "Have at least one digit"})
          break
        case "spaces":
          result.push({valid: false, error: "Cannot have any spaces"})
          break
        case "oneOf":
          result.push({valid: false, error: "This password is not secure please choose another"})
          break
    }
  }
  
  if(errors.length < 1) {
    return ([{valid: true, error: ""}])
  } else {
    return result
  }
}

export async function handleSubmit(username: string, email: string, password: string) {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })

    const data = await response.json()
  } catch (error) {
    console.error("Error creating user:", error)
  }
}



  