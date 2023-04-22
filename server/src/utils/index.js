import slugify from "slugify";
import qs from "qs";
import crypto from "crypto";

const secretKey = 'ZRAQARXDKLZUARVXEWZPQZTMXZVJNMEV';

export const strToSlug = (str) => {
  return slugify(str, "-");
};

export const formatPrice = (price) => {
  if (price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
};


export function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

export function generateSecureHash(data) {
  const signData = qs.stringify(data, {encode: false});
  const hmac = crypto.createHmac("sha512", secretKey);
  return hmac.update(new Buffer(signData, 'utf-8')).digest("hex")
}