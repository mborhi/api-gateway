# API Gateway Microservice

The api gateway for the distributed spotify quick discover app.

## Table of Contents

* [Deployment](#deployment)
* [Archictecture](#architecture)

---

# Deployment

This section describes how to deply and utilize this api gateway in conjunction with the rest of the [Distributed Spotify Quick Discover](https://github.com/mborhi/Distributed-Spotify-Quick-Discover) App.

## Docker-Compose

## Kubernetes 
---

# Architecture

This API gateway is the single entry point for all client requests. It handles requests by either directly proxying it to the appropriate service, or fanning out the request to aggregrate the necessary data to make the request.

The gateway exposes several endpoints each beginning with '/api' :

* __'/auth/'__
* __'/playback/'__
* __'/retrieval/'__

A middleware function checks whether the requested resource requires authentication. If so, it makes a request to the authorization microservice to validate the request with credentials in the request header. On successful validation, the credentials used for authentication are stripped from the request, and replaced with an appropriate resolved value to allow for access to the resources from the service the request is being made to. 

This api gateway abstracts and simplifies the development of future services. It does so by implementing shared logic, such as authentication, and by transoforming requests, so that the service can appropriately handle it.