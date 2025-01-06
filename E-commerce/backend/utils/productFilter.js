class ProductFilter {
  constructor(query, queryStr) {
    this.query = query; // MongoDB query object
    this.queryStr = queryStr; // Query string from the request
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: { $regex: escape(this.queryStr.keyword), $options: "i" },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const deleteFields = ["keyword", "page", "limit"];
    deleteFields.forEach((field) => delete queryCopy[field]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    console.log("MongoDB Filter Query:", queryStr); // Sorguyu kontrol et

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const activePage = this.queryStr.page || 1;
    const skip = resultPerPage * (activePage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ProductFilter;

// Escape function to sanitize the input for regex
function escape(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
