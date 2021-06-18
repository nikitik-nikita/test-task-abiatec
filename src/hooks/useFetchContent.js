import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const defaultUrl = "https://rickandmortyapi.com/api/character";

export const useFetchContent = () => {
  const [data, setData] = useState([]);
  const [imgList, setImgList] = useState([]);
  const [count, setCount] = useState(10);
  const [page, updatePage] = useState({ current: defaultUrl });

  const { current, pages } = page;

  useEffect(() => {
    axios.get(defaultUrl)
      .then(res => {
        const { data } = res;

        setData(data.results)
        setImgList(data.results.slice(0, count))

        updatePage(prev => {
          return {
            ...data.info,
            current: prev.current
          }
        });
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (current === defaultUrl) return;

    axios.get(current)
      .then(res => {
        const { data } = res;

        setData(prev => {
          return [...prev, ...data.results]
        })

        updatePage({
          ...data.info,
          current: current
        });
      })
      .catch(err => {
        console.log(err);
      })
  }, [current])

  useEffect(() => {
    setImgList([...data.slice(0, count)])

    if (data.length && count > data.length) {
      setCount(data.length)
    }
  }, [data, count])

  const fetch = useCallback(async (value) => {
    setCount(10);

    let fetchResult;

    if (value.length) {
      const fetchByName = `${defaultUrl}/?name=${value}`;

      await axios.get(fetchByName)
        .then(res => {
          fetchResult = res.data;

          setData(fetchResult.results)

          setImgList(fetchResult.results.slice(0, count));

          updatePage({
            ...fetchResult.info,
            current: defaultUrl
          });
        })
        .catch(err => {
          console.log(err);
        })
    }

  }, []);

  const fetchMore = useCallback(async () => {
    setCount(prev => prev + 10)

    if (pages > 1 && page.next !== null) {
      updatePage(prev => {
        return {
          ...prev,
          current: prev?.next
        }
      })
    }
  }, [page])

  return [imgList, fetch, fetchMore];
};
