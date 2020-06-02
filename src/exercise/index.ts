import '../scss/styles.scss';
interface ISingleRepo {
  name: string;
}
interface IRepos {
  items: Array<ISingleRepo>;
}
async function fetchRepo(): Promise<Array<ISingleRepo>> {
  // Sử dụng hàm fetch để gửi request và nhận về dữ liệu
  let res: Response | IRepos = await fetch('https://api.github.com/search/repositories?q=facebook');
  res = await res.json() as IRepos;
  return res.items;
}

function createItem(text: string): HTMLLIElement {
  const item = document.createElement('li') as HTMLLIElement;
  item.textContent = text;
  return item;
}

async function getUser(value: string): Promise<Array<ISingleRepo>> {
  try {
    let res: Response | IRepos = await fetch(`https://api.github.com/search/repositories?q=${value}`);
    res = await res.json() as IRepos;
    return res.items;
  } catch (e) {
    throw e;
  }
}

// async function test(): Promise<Array<ISingleRepo>> {
//   try {
//     let value = "facebook";
//     let res: Response | IRepos = await fetch(`https://api.github.com/search/repositories?q=${value}`);
//     res = await res.json() as IRepos;
//     return res.items;
//   } catch (e) {
//     throw e;
//   }
// }

const container = document.querySelector('.app .list');

async function main() {
  // step 1: fetch repo
  // const res = await fetchRepo();
  const queryString = window.location.search;
  let searchParam = new URLSearchParams(queryString);
  let value = searchParam.get('search');
  const res = await getUser(value);
  // const res = await test();
  // step 2: lặp qua mảng các item trả về
  // step 3: call hàm createItem sau đó truyền vào name của từng item ở mỗi vòng lặp
  // step 4: call hàm container.appendChild(item mà hàm createItem trả về)
  res.forEach((item: any) => {
    const li = createItem(item.name);
    container.appendChild(li);
  });
}

main();
