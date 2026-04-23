function oxfordJoin(coll) {
    return coll.length < 2 ? coll.join(", ") : coll.slice(0, -1).join(", ") + ", and " + coll[coll.length-1];
}

async function getSVG(fieldName, fieldValue) {
   return fetch("{{ '/assets/svg/' | url }}" + fieldName + "/" + fieldValue + ".svg").then(res => res.ok ? res.text() : "");
}

function card(post, postUrl) {
  const fragmentStatus = post.isFragment ? "Fragment" : "Non-fragment"
  const titleHover = post.title.toLowerCase().includes(post.NSC.toLowerCase()) ? '' : `title="# ${post.NSC}"`;
  let summary = "";
  if (Array.isArray(post.summary)) {
    summary = '<ul class="list-disc">';
    summary += post.summary
          .map(bulletPoint => `\n<li>\n\t\t${bulletPoint}\n\t</li>`)
          .join("\n");
    summary += '\n</ul>';
  } else if (post.summary != null) {
    summary = `<p>${post.summary}</p>`;
  }
  return `
  <div class="postcard">
      <div class="rounded shadow-lg h-full bg-gray-50 hover:shadow-xl">
          <a href="${post.url}">
          <img
          class="w-full m-0 rounded-t lazy max-h-72 object-cover object-top card-thumbnail"
          src="/shakespearedb/${post.titleImage}"
          width="500"
          height="500"
          alt="${post.title}">
          </a>
          <div class="px-6 py-5">
              <div class="font-semibold text-lg mb-2">
                  <a class="text-gray-900 hover:text-gray-700" ${titleHover} href="${post.url}">${post.title}</a>
              </div>
              <div class="my-5 flex flex-wrap justify-between">
                  <p id="yearCount-table-cell-${post.fileSlug}" class="text-gray-700 mb-1 max-w-2/5"><strong>Year:</strong> ${post.yearCount}</p>
                  <p id="edition-table-cell-${post.fileSlug}" class="text-gray-700 mb-1 max-w-3/5 wrap-break-word text-right"><strong>Edition #:</strong> ${post.edition_number.join(", ") || "N/A"}</p>
                  <div class="flexitems-break"></div>
                  <p id="STC-table-cell-${post.fileSlug}" class="text-gray-700 mb-1 max-w-2/5"><strong>STC:</strong> ${post.STC_Wing.join(", ") || "N/A"}</p>
                  <p id="location-table-cell-${post.fileSlug}" class="text-gray-700 mb-1 max-w-3/5 wrap-break-word text-right"><strong>Location:</strong> ${post.location_name.join(", ") || "N/A"}</p>
              </div>
              ${summary}
          </div>
      </div>
  </div>
  `;
}
