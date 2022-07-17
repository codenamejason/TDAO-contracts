import axios from "axios";

const server = "https://tdao-api.herokuapp.com";

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export function readTextFile(file) {
  var allText = "";
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
  return allText;
}

export async function getAuthorData(params) {
  try {
    const res = await axios.get(server + "/api/authors", { params });
    if (res.data.success) {
      return res.data.data[0];
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }

  return null;
}

export function strcmp(a, b) {
  a = a.toString();
  b = b.toString();
  let i;
  let n = Math.max(a.length, b.length);
  for (i = 0; i < n && a.charAt(i) === b.charAt(i); ++i);
  if (i === n) return 0; 
  return a.charAt(i) > b.charAt(i) ? -1 : 1;
}

export const getTextColorForCategory = category => {
  let color = "rgba(60, 188, 0, 1)";
  switch (category) {
    case "Technology":
      color = "rgba(60, 188, 0, 1)";
      break;
    case "History":
      color = "rgba(0, 238, 223, 1)";
      break;
    case "Romance":
      color = "rgba(113, 1, 255, 1)";
      break;
    case "Comedy":
      color = "rgba(250, 126, 0, 1)";
      break;
    case "Politics":
      color = "rgba(255, 0, 0, 1)";
      break;
    default:
      color = "rgba(60, 188, 0, 1)";
  }
  return color;
};

export const getBgColorForCategory = category => {
  let color = "rgba(60, 188, 0, 0.22)";
  switch (category) {
    case "Technology":
      color = "rgba(60, 188, 0, 0.22)";
      break;
    case "History":
      color = "rgba(0, 238, 223, 0.22)";
      break;
    case "Romance":
      color = "rgba(113, 1, 255, 0.22)";
      break;
    case "Comedy":
      color = "rgba(250, 126, 0, 0.22)";
      break;
    case "Politics":
      color = "rgba(255, 0, 0, 0.22)";
      break;
    default:
      color = "rgba(60, 188, 0, 0.22)";
  }
  return color;
};
