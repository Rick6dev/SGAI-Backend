FROM 10.134.0.252:4443/node2011

MAINTAINER Jc  <juan.marquez@credicard.com.ve>

RUN mkdir public
ADD . /public
WORKDIR /public
EXPOSE 443
ENTRYPOINT npm start
