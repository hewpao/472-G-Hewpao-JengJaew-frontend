build-image:
	@ echo "Building frontend docker image..."
	@ docker build \
		--file Dockerfile \
		--tag hewpao/hewpao-frontend \
		.
