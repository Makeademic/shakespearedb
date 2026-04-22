function oxfordJoin(coll) {
    return coll.length < 2 ? coll.join(", ") : coll.slice(0, -1).join(", ") + ", and " + coll[coll.length-1];
}

module.exports = {
  layout: "layouts/db_entry.njk",
  eleventyComputed: {
    permalink: (data) => `copies/${data.page.fileSlug}/index.html`,
    titleImage: (data) => {
      if (data.titleImage) {
        if (data.titleImage.search(/^https?:\/\//) !== -1) {
          return data.titleImage.replace("http:", "https:");
        }
        return `/assets/img/title_icons/${data.titleImage}`;
      } else {
        return false;
      }
    },
    description: (data) => `${data.title}.`,
    ogImage: (data) => data.titleImage,
    imageAlt: (data) => `${data.title}.`
  }
};
