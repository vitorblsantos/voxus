const gulp = require("gulp"),
		less = require("gulp-less"),
		minifyJS = require('gulp-jsmin'),
		uglifycss = require("gulp-uglifycss"),
		svgmin = require("gulp-svgmin"),
		watch = require("gulp-watch");

		


gulp.task('build-css',()=>{
	return(
		gulp.src('./src/less/*.less')
			.pipe(less())
			.pipe(uglifycss())
			.pipe(gulp.dest('./dist/css/'))
	);
});

gulp.task('build-js',()=>{
	return(
		gulp.src('./src/js/*.js')
		.pipe(minifyJS())
		.pipe(gulp.dest('./dist/js/'))
	);
})

gulp.task("build-svg", () =>{
	return(
		gulp.src("./src/images/**/*.svg")
		.pipe(svgmin())
		.pipe(gulp.dest("./dist/images/"))
	)
})

gulp.task('copy-files', complete =>{
	return(
		gulp.src(['node_modules/jquery/dist/jquery.min.js','node_modules/jquery/dist/jquery.min.map'])
			.pipe(gulp.dest('dist/js/lib'))
	)
});

gulp.task('watch',()=>{
	return(
		gulp.watch("./src/less/*.less",gulp.series(['build-css'])),
		gulp.watch("./src/js/*.js",gulp.series(['build-js'])),
		gulp.watch("./src/images/*.svg",gulp.series(['build-svg']))
	);
});

gulp.task('default', gulp.series(['build-js','build-css','copy-files','build-svg','watch']));