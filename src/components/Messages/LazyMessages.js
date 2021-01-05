import React, { useEffect, useState, useContext } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { ChatCTX } from "components/Current/CurrentChat";
import { lazyMessages } from "actions/messages";
import request from "util/request";

export default function LazyMessages() {
  const [ref, inView] = useInView({ threshold: 0 });
  const [offset, setOffset] = useState(1);
  const [loading, setLoading] = useState(false);
  const chat = useContext(ChatCTX);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);

      request
        .get(`/auth/chats/${chat}/messages?offset=${offset}`)
        .then((response) => {
          console.log(response.data);
          dispatch(lazyMessages(response.data, chat));
          setOffset((offset) => offset + 1);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
  }, [inView, chat, offset, loading, dispatch]);


  return (
    <div id="lazy-messages" ref={ref} />
  );
}