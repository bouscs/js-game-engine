const resolveMixins = (ctx, template, mixinStack = null) => {
  if (!mixinStack) mixinStack = []

  if (template.use) {
    for (const mixinName of template.use) {
      const mixinTemplate = ctx.findTemplate(mixinName)

      mixinStack = resolveMixins(ctx, mixinTemplate, mixinStack)

      mixinStack.push(mixinName)
    }
  }

  return _.uniq(mixinStack)
}

export const createNode = (ctx, mainTemplate, parent = null, props = null) => {
  const template = _.cloneDeep(mainTemplate)
  if (!template.name) ctx.error('Node Object is missing "name" property')
  if (!template.setup) ctx.error('Node Object is missing setup function')

  if (props) ctx.props = props

  const mixins = resolveMixins(ctx, template)

  const instance = {
    // contém variáveis, métodos, children, computed
    name: template.name,
  }

  if (mixins.length > 0) {
    for (const m of mixins) {
      const mixinTemplate = _.cloneDeep(ctx.findTemplate(m))

      if (mixinTemplate.vars) {
        Object.assign(instance, mixinTemplate.vars)
      }
      if (mixinTemplate.methods) {
        for (const key of Object.keys(mixinTemplate.methods)) {
          instance[key] = mixinTemplate.methods[key].bind(instance)
        }
      }
    }
  }

  if (parent) instance.parent = parent

  // inicializar children
  if (template.nodes) {
    for (const child in template.nodes) {
      let childTemplate = child
      if (typeof child === 'string') {
        childTemplate = ctx.findTemplate(child)
      }

      if (!childTemplate.vars) childTemplate.vars = {}

      instance[childTemplate.name] = createNode(ctx, childTemplate, instance)
    }
  }

  if (template.vars) {
    Object.assign(instance, template.vars)
  }

  if (template.methods) {
    for (const key of Object.keys(template.methods)) {
      instance[key] = template.methods[key].bind(instance)
    }
  }

  const setupData = template.setup.apply(instance, [ctx])
  if (setupData) Object.assign(instance, setupData)

  if (mixins.length > 0) {
    for (const m of mixins) {
      const mixinTemplate = ctx.findTemplate(m)
      if (mixinTemplate.setup) mixinTemplate.setup.apply(instance, [ctx])
    }
  }

  return instance
}
