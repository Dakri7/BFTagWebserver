# Use the minimal Node.js 18.19 version for Angular build
FROM node:18.19.0-slim as build-stage

# Install Git
RUN apt-get update && apt-get install -y git

# Clone the git repository
RUN git clone https://github.com/Dakri7/BFTagWebserver.git /app

# Set working directory
WORKDIR /app

# Install Angular dependencies
RUN npm install

# Run npm audit
RUN npm audit --production

# Build the Angular application
RUN npm run build --prod

# Use an official Apache HTTP server image to serve the Angular app
FROM httpd:2.4

# Copy the compiled Angular app from the build stage to Apache web server
COPY --from=build-stage /app/dist/bftag-webserver/browser/* /usr/local/apache2/htdocs/

# Add custom Apache configuration for Angular
# COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf

# Expose the default Apache port
EXPOSE 80

# Start the Apache web server
CMD ["httpd-foreground"]
