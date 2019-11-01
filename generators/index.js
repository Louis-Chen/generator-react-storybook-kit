'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const mkdirp = require('mkdirp')

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts)
		this.tmpDir = 'react-storybook'
		this.name = ''
	}

	prompting() {
		this.log(yosay(`Welcome to the divine ${chalk.red('generator-react-storybook')} generator!`))

		const prompts = [
			{
				type: 'input',
				name: 'projectName',
				message: 'Your project name',
				default: 'react-storybook'
			}
		]

		this.log(this.appname.replace(/\s+/g, '-') + ' is getting generated..!')

		return this.prompt(prompts).then(props => {
			this.props = props
			this.name = props.projectName.replace(/\s+/g, '-')
		})
	}

	default() {
		mkdirp(this.name)
		this.destinationRoot(this.destinationPath(this.name))
	}
	writing() {
		this.fs.copy(this.templatePath(this.tmpDir + '/server'), this.destinationPath('server'), {
			globOptions: {
				ignore: ['**/node_modules', '**/package-lock.json']
			}
		})
		this.fs.copy(this.templatePath(this.tmpDir + '/stories'), this.destinationPath('stories'))
		this.fs.copy(this.templatePath(this.tmpDir + '/.storybook'), this.destinationPath('.storybook'))
		this.fs.copy(this.templatePath(this.tmpDir + '/stories'), this.destinationPath('stories'))
		this.fs.copyTpl(this.templatePath(this.tmpDir + '/_package.json'), this.destinationPath('package.json'), {
			name: this.props.projectName.replace(/\s+/g, '-')
		})

		this.fs.copy(this.templatePath(this.tmpDir + '/_gitignore'), this.destinationPath('.gitignore'))

		this.removeFiles()
	}

	removeFiles() {
		this.fs.delete(this.destinationRoot() + '/_package.json')
		this.fs.delete(this.destinationRoot() + '/_gitignore')
	}

	install() {
		this.installDependencies({
			bower: false
		})
	}
}
