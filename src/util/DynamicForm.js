function isNil(x) {
  return x === null || x === undefined;
}
const publicConfig = {
  disabled: false,
  clearable: true,
  required: false,
  span: 8,
};

const FormConfig = {
  inputConfig: (config, form, { label = 'label', prop = 'prop' }) => {
    const {
      defaultValue = '',
      colAttrs = {},
      formItemAttrs = {},
      componentAttrs = {},
    } = config;
    const formData = {
      [prop]: !isNil(form[prop]) ? form[prop] : defaultValue,
    };
    return {
      component: {
        component: 'el-input',
        prop: config[prop],
        label: config[label],
        formItemAttrs: {
          ...formItemAttrs,
        },
        colAttrs: {
          span: publicConfig.span,
          ...colAttrs,
        },
        componentAttrs: {
          type: 'text',
          placeholder: '请输入',
          disabled: publicConfig.disabled,
          clearable: publicConfig.clearable,
          ...componentAttrs,
        },
      },
      form: formData,
    };
  },
  radioGroupConfig: (config, form, { label = 'label', prop = 'prop' }) => {
    const {
      defaultValue = '',
      colAttrs = {},
      formItemAttrs = {},
      componentAttrs = {},
      options = [],
    } = config;
    return {
      component: {
        component: 'el-radio-group',
        prop: config[prop],
        label: config[label],
        formItemAttrs: {
          ...formItemAttrs,
        },
        colAttrs: {
          span: publicConfig.span,
          ...colAttrs,
        },
        componentAttrs: {
          disabled: publicConfig.disabled,
          ...componentAttrs,
        },
        options,
      },
      form: {
        [prop]: !isNil(form[prop]) ? form[prop] : defaultValue,
      },
    };
  },
  checkboxGroupConfig: (config, form, { label = 'label', prop = 'prop' }) => {
    const {
      defaultValue = '',
      colAttrs = {},
      formItemAttrs = {},
      componentAttrs = {},
      options = [],
    } = config;
    return {
      component: {
        component: 'el-checkbox-group',
        prop: config[prop],
        label: config[label],
        formItemAttrs: {
          ...formItemAttrs,
        },
        colAttrs: {
          span: publicConfig.span,
          ...colAttrs,
        },
        componentAttrs: {
          disabled: publicConfig.disabled,
          ...componentAttrs,
        },
        options,
      },
      form: {
        [prop]: !isNil(form[prop]) ? form[prop] : defaultValue,
      },
    };
  },
  selectConfig: (config, form, { label = 'label', prop = 'prop' }) => {
    const {
      defaultValue,
      colAttrs = {},
      formItemAttrs = {},
      componentAttrs = {},
      options = [],
    } = config;
    let $defaultValue = null;
    if (formItemAttrs.multiple) {
      if (Array.isArray(form[prop]) && form[prop].length > 0) {
        $defaultValue = form[prop];
      } else {
        $defaultValue = Array.isArray(defaultValue) ? defaultValue : [];
      }
    } else {
      $defaultValue = !isNil(form[prop]) ? form[prop] : (defaultValue || '');
    }
    return {
      component: {
        component: 'el-select',
        prop: config[prop],
        label: config[label],
        formItemAttrs: {
          ...formItemAttrs,
        },
        colAttrs: {
          span: publicConfig.span,
          ...colAttrs,
        },
        componentAttrs: {
          disabled: publicConfig.disabled,
          clearable: publicConfig.clearable,
          placeholder: '请选择',
          ...componentAttrs,
        },
        options,
      },
      form: {
        [prop]: $defaultValue,
      },
    };
  },

  dateConfig: (config, form, { label = 'label', prop = 'prop' }) => {
    const {
      defaultValue = '',
      colAttrs = {},
      formItemAttrs = {},
      componentAttrs = {},
    } = config;
    return {
      component: {
        component: 'el-date-picker',
        prop: config[prop],
        label: config[label],
        formItemAttrs: {
          ...formItemAttrs,
        },
        colAttrs: {
          span: publicConfig.span,
          ...colAttrs,
        },
        componentAttrs: {
          disabled: publicConfig.disabled,
          clearable: publicConfig.clearable,
          type: 'date',
          valueFormat: 'YYYY-MM-DD',
          ...componentAttrs,
        },
      },
      form: {
        [prop]: !isNil(form[prop]) ? form[prop] : defaultValue,
      },
    };
  },
};

export default FormConfig;
