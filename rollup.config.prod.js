import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import minify from 'rollup-plugin-minify-es';
import cssdiscardcomments from 'postcss-discard-comments';

export default {
  input: './src/js/Header.js',
  output:[
    {
      name:'FtcHeader',
      sourcemap: true,
      globals:{
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types':'PropTypes',
        'classnames':'classnames',
        'react-css-modules':'CSSModules',
        '@ftchinese/ftc-pushdownmenu-react':'FtcPushdown','@ftchinese/ftc-nav-react':'FtcNav','@ftchinese/ftc-searchbar-react':'FtcSearchbar','@ftchinese/ftc-login-react':'FtcLogin'
      },
      
      file: './build/index.js',
      format: 'umd'
    },   
    {
      sourcemap: true,
      file: './build/index.es.js',
      format: 'es'
    },
  ],


  plugins: [
    
    postcss({
      modules: true,
      plugins: [
        cssdiscardcomments()
      ]
    }),
    
    
    babel({
      exclude: 'node_modules/**'
    }),

    resolve({
      jsnext: true,
      main:true
    }),
    commonjs(),
    minify({
      compress: {
        drop_console:true
      }
    })
  ],

  external: ['react', 'react-dom','prop-types','classnames','react-css-modules','@ftchinese/ftc-pushdownmenu-react','@ftchinese/ftc-nav-react','@ftchinese/ftc-searchbar-react','@ftchinese/ftc-login-react']
}