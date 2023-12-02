package com.teamSweProject.dataTransferObjects;

public class MultiplexResponseDTO {
    private Long multiplexId;
    private String multiplexName;

    public MultiplexResponseDTO(Long multiplexId, String multiplexName) {
        this.multiplexId = multiplexId;
        this.multiplexName = multiplexName;
    }

    public Long getMultiplexId() {
        return multiplexId;
    }
    public void setMultiplexId(Long multiplexId) {
        this.multiplexId = multiplexId;
    }
    public String getMultiplexName() {
        return multiplexName;
    }
    public void setMultiplexName(String multiplexName) {
        this.multiplexName = multiplexName;
    }
}
