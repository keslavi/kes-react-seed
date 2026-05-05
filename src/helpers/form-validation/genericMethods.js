import * as yup from 'yup';
import r from './regex';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';
/*
README  
add extended, named custom functions to yup.string

copy/paste this for each new method to add. 
suggest keeping newest on top instead of bottom

*/
const val={i:0};

/**
 * Registers a `validDateRange` helper on `yup.date` that constrains values between
 * a lower and upper bound.
 * @param {dayjs.ConfigType|null} [min=null] Lower bound; defaults to 125 years ago.
 * @param {dayjs.ConfigType|null} [max=null] Upper bound; defaults to the current date.
 * @param {string} [message="Date must be within valid range"] Custom error message (reserved for future use).
 * @returns {yup.DateSchema} Date schema with applied min/max constraints.
 */
yup.addMethod(yup.date, "validDateRange", function(min = null, max = null, message = "Date must be within valid range") {
  const maxDate = max || dayjs();
  const minDate = min || dayjs().subtract(125, 'year').startOf('year');
  
  return this
    .max(maxDate, `Date cannot be later than ${maxDate.format('MM/DD/YYYY')}`)
    .min(minDate, `Date cannot be earlier than ${minDate.format('MM/DD/YYYY')}`)
    // .test(
    //   "valid-date-range",
    //   message,
    //   (value) => {
    //     if (!value) return true; // Let required validation handle empty values
    //     const date = dayjs(value);
    //     return date.isBefore(maxDate) && date.isAfter(minDate);
    //   }
    // );
});

/**
 * Ensures a string conforms to a custom template-specific rule set.
 * @returns {yup.StringSchema} String schema with template validation.
 */
yup.addMethod(yup.string,"isTemplate",function(){
  return this
  //.min(3,'too') //we can do several layers of yup validation, including custom
  .test(
    "subject-custom",
    "custom function error message",
    (value)=>{
      //we can do whatever here to validate
      return false;
    }
  )  
})

/**
 * Marks a string field as required unless a draft flag suppresses validation.
 * @param {string} message Error message surfaced when the field is empty.
 * @returns {yup.StringSchema} String schema with conditional required check.
 */
yup.addMethod(yup.string,"required",function(message){
  return this
  .test(
    "subject-custom",
    message,
    (value)=> window.isDraft!==true ? !isEmpty(value) : true
  )  
})

/**
 * removes non-printable characters after trimming.
 * @returns {yup.StringSchema} remove non-printable chars. this doesn't change the FIELD, it changes submit KVP
 */
yup.addMethod(yup.string, "trim2",function(){
  return this
    .trim()
    .transform(value=>value.replace(/[^ -~]+/g, "*"))
})

/**
 * Validates that the string represents a currency amount using shared regex.
 * @returns {yup.StringSchema} String schema requiring currency formatting.
 */
yup.addMethod(yup.string,"isCurrency",function(){
  return this
    .required()
    .matches(r.currency.pattern,r.currency.message)
})

/**
 * Verifies at least one checkbox in a group is truthy.
 * @param {string} message Error message when the requirement is not met.
 * @returns {yup.ArraySchema} Array schema enforcing a truthy selection.
 */
yup.addMethod(yup.array,'checkboxGroupChecked',function(message){
  return (
    this
    .test('checkbox-group-checked',message,(array)=>{
      return array && array.com((value)=>isTruthy(value))
    })
  )
})

/**
 * Validates phone numbers against the shared phone pattern.
 * @param {string} [message] Optional override for the default phone error message.
 * @returns {yup.StringSchema} String schema requiring a phone number.
 */
yup.addMethod(yup.string,'isPhoneNumber',function(message){
  return this.required().matches(
    r.phone.pattern,
    message || r.phone.message
  ); 
})


/**
 * Alternative trim helper that strips non-printable characters after trimming.
 * @param {string} [message] Placeholder parameter retained for backward compatibility.
 * @returns {yup.StringSchema} String schema trimming and sanitising characters.
 */
yup.addMethod(yup.string,'trim2',function(message){
  return this.trim().transform(value=>value.replace(/[^ -~]+/g,"*"));
})

export default yup;


