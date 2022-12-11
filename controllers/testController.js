// import AesEncryption from "../config/encryption.js";

// import CryptoJS from "crypto-js";
import amazonScraper from "amazon-buddy";
import JSEncrypt from "node-jsencrypt";
class EncryptDecrypt {
  static encrypt = (text, key) => {
    const crypt = new JSEncrypt();
    crypt.setKey(key);
    return crypt.encrypt(text);
  };

  static decrypt = (encrypted, privateKey) => {
    const crypt = new JSEncrypt();
    crypt.setPrivateKey(privateKey);
    return crypt.decrypt(encrypted);
  };
}

class AmazonController {
  static test = async (req, res) => {
    try {
      console.log(req.body["data"]);
      var privateKey =
        "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";

      const publickey =
        "MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA8ajgF4qDl5Kjk7yFVSbq1x0TewrUHoF73AN8OMjjeEqpeBnDsqwCrkWbgQoMt3FDnguA+cZAMjPt4uHeorWlA8iCJ8/2TUXFM/lj8Qr/NrqNuOLvjHqwy4X0jXIh380vIGMldWcmZ26zTaWU2gjhGda7zYbyspevqoBayQ3/sPcmVWofRe044q9Tbr2M7tRfkwFRkahpN+HBOkv5YocWm8ISuzvprELLfMS0gs7U5mQB4QL0eSPYPziaGn9SlNE2MchVI2xQMU/yC0lCuSs6dZhnSMXPVQ6KmY62ka98y6UWskCHX0ZFUQ4TG0GtLDjTZaBViPqL8/PP96tJo9tNZckE4OVYONqCmAq4OGxlWDEl7kmeNbLs43F1U2OVAzKLDkgm3mkIPgRoqP0xsOMLRU9/1KRiOaQH8gVPgzZsUPYonzmBP6uoMk9Ip/kkC4hyr5/dgUYRdSXhqX1bRb6vwvy+OYdsoQqdhiXDMVFat62H+O3PKUWpIuA49KEYCkdoCxmeiGUIwGvaOMBdR2vb5Nesbgp+XGzEq4C9o5F8wSaWCq1KA/36qbWoleN5TalqCCAnFYsgQB8he9g0gpuoAWfzirkhds3QXjevRTTPRhzjCCHjPvUh/Y6/yZhV0Klr94PFCdGK0fA8KBxPCKsrl80RCN1/yq5v1qFNvKVCcnsCAwEAAQ==";
      const crypt = new JSEncrypt();
      var data = EncryptDecrypt.decrypt(req.body.data, privateKey);
      var newData = data + "this is after decrypt and ferther encrypt";
      var data = EncryptDecrypt.encrypt(newData, publickey);

      res.status(200).json({
        status: "success",
        message: "Test",
        key: "my 32 length key................",
        data: data,
      });
      // }
      // else {
      //   res.status(400).json({
      //     status: "failed",
      //     message: "Invalid user",
      //   });
      // }
    } catch (err) {
      console.log("err", err);
    }
  };
  static products = async (req, res) => {
    try {
      // Collect 50 products from a keyword 'xbox one'
      // Default country is US
      const products = await amazonScraper.products({
        keyword: "mobilephone",
        number: 3,
      });

      console.log(products);
      if (products) {
        return res.status(200).json({
          status: "success",
          message: "successfully fetched products",
          data: products,
        });
      } else {
        return res.status(400).json({
          status: "failed",
          data: [],
          message: "failed to fetch products",
        });
      }

      // Collect 50 products from a keyword 'xbox one' from Amazon.NL
      // const products = await amazonScraper.products({ keyword: 'Xbox One', number: 50, country: 'NL' });

      // Collect 50 products from a keyword 'xbox one' from Amazon.CO.UK
      // const products = await amazonScraper.products({ keyword: 'Xbox One', number: 50, country: 'GB' });

      // Collect products that are located on page number 2
      // const reviews = await amazonScraper.products({ keyword: 'Xbox One', bulk: false, page: 2 });

      // Collect 50 products from a keyword 'xbox one' with rating between 3-5 stars
      const products_rank = await amazonScraper.products({
        keyword: "Xbox One",
        number: 50,
        rating: [3, 5],
      });

      // Collect 50 reviews from a product ID B01GW3H3U8
      // const reviews = await amazonScraper.reviews({
      //   asin: "B01GW3H3U8",
      //   number: 50,
      // });

      // Collect 50 reviews from a product ID B01GW3H3U8  with rating between 1-2 stars
      // const reviews_rank = await amazonScraper.reviews({
      //   asin: "B01GW3H3U8",
      //   number: 50,
      //   rating: [1, 2],
      // });

      // Get single product details by using ASIN id
      // const product_by_asin = await amazonScraper.asin({ asin: "B01GW3H3U8" });

      // Get categories from amazon.COM.AU
      // const categories_AU = await amazonScraper.categories({ country: "AU" });

      // Get categories from amazon.CN
      // const categories_CN = await amazonScraper.categories({ country: "CN" });
    } catch (error) {
      console.log(error);
    }
  };
}

export default AmazonController;
