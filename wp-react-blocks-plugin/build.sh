echo "EMBEDDABLE_URI=https://tobacco.dgstg.org/#/en/embeddable" > .env

for d in */; do
   echo ".................. Compiling folder $d ..................."

     cd $d
     cp ../package.json ./package.json
     cp ../webpack.config.js ./webpack.config.js
     rm -rf build
     pnpm install
     pnpm run build
     # rm -rf node_modules
     rm webpack.config.js
     rm package.json
     rm package-lock.json
     rm pnpm-lock.yaml
    cd ..
done

