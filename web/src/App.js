/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import { get } from "axios";
import { useForm } from "react-hook-form";

const Search = () => {
  const { handleSubmit, register } = useForm();
  const [videos, setVideos] = useState([]);

  const getVideos = async (values) => {
    const { title } = values;

    if (!title) return;

    try {
      const { API_URL } = process.env;
      const apiUrl = API_URL || "http://localhost:5001/search";
      const response = await get(`${apiUrl}/${title}`);

      setVideos(response.data);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  /**
   * 
   * Lo dejo comentado porque intente usarlo, pero no me mostraba el listado (IDKW)
   * Si se actualizaba la data, pero no mostraba el listado
  useEffect(() => {
    List(videos); 
  }, [videos]);*/

  return (
    <div>
      <form name="search" onSubmit={handleSubmit(getVideos)}>
        <label>
          Name:
          <input type="text" {...register("title")} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {videos.map((video) => {
          return (
            <>
              <div
                // style={{ width: 700 }}
                href={`https://www.youtube.com/watch?v=${video.id}`}
              >
                <img
                  style={{
                    height: video.thumbnail.height,
                    width: video.thumbnail.width,
                  }}
                  src={video.thumbnail.url}
                  alt={video.id}
                />
                <span> {video.title} </span>
                <div> {video.description} </div>
              </div>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Search;
