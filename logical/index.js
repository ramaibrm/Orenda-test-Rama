/**
 * 
 * @param {number} num 
 * @returns {boolean}
 */
const isPalindrome = (num) => {
    const numString = num.toString();
    const reversedNumber = numString.split('').reverse().join('');
    return numString === reversedNumber;
}

console.log("Output: " + isPalindrome(-121))