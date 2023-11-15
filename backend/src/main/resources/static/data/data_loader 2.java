
package com.example.movieservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class data_loader {
    private final ObjectMapper objectMapper;

    public data_loader(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<Movie> loadDummyData() throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("data/dummy_data.json");
        List<Movie> movies = objectMapper.readValue(inputStream, new TypeReference<List<Movie>>() {});
        return movies;
    }
}
