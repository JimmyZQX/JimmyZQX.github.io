var dictionary = 
{
  "+": {
    "comment": ["加"],
    "alternative": ["plus", "\u52a0"],
    "type": "operator",
    "priority": 10,
    "rule": {"2,3": "#1 + #3"}
  },
  "-": {
    "comment": ["减"],
    "alternative": ["minus", "subtracts", "\u51cf"],
    "type": "operator",
    "priority": 10,
    "rule": {"2,3": "#1 - #3"}
  },
  "*": {
    "comment": ["乘"],
    "alternative": ["times", "multiplies by", "\u4e58"],
    "type": "operator",
    "priority": 20,
    "rule": {"2,3": "#1 \\cdot #3"}
  },
  "/": {
    "comment": ["除, 除以"],
    "alternative": ["divides", "divided by", "\u9664", "\u9664\u4ee5"],
    "type": "operator",
    "priority": 20,
    "rule": {"2,3": "\\frac{#1}{#3}"}
  },
  "=": {
    "comment": ["等于"],
    "alternative": ["equal", "\u7b49\u4e8e"],
    "type": "operator",
    "priority": 0,
    "rule": {"2,3": "#1 = #3"}
  },
  ">=": {
    "comment": ["大于等于"],
    "alternative": ["geq", "\u5927\u4e8e\u7b49\u4e8e"],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 \\geq #3"}
  },
  "<=": {
    "comment": ["小于等于"],
    "alternative": ["leq", "\u5c0f\u4e8e\u7b49\u4e8e"],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 \\leq #3"}
  },
  "^": {
    "comment": ["到", "终止值", "次方", "上标"],
    "alternative": ["to", "\u5230", "\u7ec8\u6b62\u503c", "\u6b21\u65b9", "\u4e0a\u6807"],
    "type": "operator",
    "priority": 30,
    "rule": {"2,3": "#1^#@3"}
  },
  "_": {
    "comment": ["从", "初始值", "下标"],
    "alternative": ["from", "\u4ece", "\u521d\u59cb\u503c", "\u4e0b\u6807"],
    "type": "operator",
    "priority": 30,
    "rule": {"2,3": "#1_#@3"}
  },
  "^^": {
    "alternative": [],
    "type": "operator",
    "priority": 29,
    "rule": {"2,3": "^#@3 #1"}
  },
  "__": {
    "alternative": [],
    "type": "operator",
    "priority": 29,
    "rule": {"2,3": "_#@3 #1"}
  },
  "<": {
    "comment": ["小于"],
    "alternative": ["less than", "\u5c0f\u4e8e"],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 < #3"}
  },
  ">": {
    "comment": ["大于"],
    "alternative": ["greater than", "\u5927\u4e8e"],
    "type": "relation",
    "priority": 0,
    "rule": {"2,3": "#1 > #3"}
  },
  "+-": {
    "comment": ["正负", "加减"],
    "alternative": ["plusminus","pm", "\u52a0\u51cf", "\u6b63\u8d1f"],
    "type": "operator",
    "priority": 10,
    "rule": {"2,3": "#1 \\pm #3"}
  },
  "alpha": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\alpha"}
  },
   "beta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\beta"}
  },
  "gamma": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\gamma"}
  },
  "Gamma": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Gamma"}
  },
  "delta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\delta"}
  },
  "Delta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Delta"}
  },
  "epsilon": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\epsilon"}
  },
  "varepsilon": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\varepsilon"}
  },
  "zeta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\zeta"}
  },
  "eta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\eta"}
  },
  "theta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\theta"}
  },
  "Theta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Theta"}
  },
  "vartheta": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\vartheta"}
  },
  "iota": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\iota"}
  },
  "kappa": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\kappa"}
  },
  "lambda": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\lambda"}
  },
  "Lamda": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Lamda"}
  },
  "mu": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mu"}
  },
  "nu": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\nu"}
  },
  "xi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\xi"}
  },
  "Xi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Xi"}
  },
  "pi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\pi"}
  },
  "Pi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Pi"}
  },
  "rho": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\rho"}
  },
  "sigma": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\sigma"}
  },
  "Sigma": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Sigma"}
  },
  "tau": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\tau"}
  },
  "upsilon": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\upsilon"}
  },
  "phi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\phi"}
  },
  "Phi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Phi"}
  },
  "varphi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\varphi"}
  },
  "chi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\chi"}
  },
  "psi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\psi"}
  },
  "Psi": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Psi"}
  },
  "omega": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\omega"}
  },
  "Omega": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\Omega"}
  },
  "del": {
    "comment": ["偏微分"],
    "alternative": ["partial", "\u504f\u5fae\u5206"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\partial"}
  },
  "grad": {
    "alternative": ["nabla"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\nabla"}
  },
  "O/": {
    "alternative": ["emptyset"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\emptyset"}
  },
  "inf": {
    "comment": ["无穷大"],
    "alternative": ["infty", "infinity","oo", "\u65e0\u7a77\u5927"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\infty"}
  },
  "aleph": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\aleph"}
  },
  ":.": {
    "comment": ["所以"],
    "alternative": ["therefore", "\u6240\u4ee5"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\therefore"}
  },
  ":'": {
    "comment": ["因为"],
    "alternative": ["because", "\u56e0\u4e3a"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\because"}
  },
  "...": {
    "comment": ["省略号", "低省略号"],
    "alternative": ["ldots", "\u7701\u7565\u53f7", "\u4f4e\u7701\u7565\u53f7"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\ldots"}
  },
  "cdots": {
    "comment": ["中省略号", "中心省略号"],
    "alternative": ["\u4e2d\u7701\u7565\u53f7", "\u4e2d\u5fc3\u7701\u7565\u53f7"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\cdots"}
  },
  "vdots": {
    "comment": ["竖省略号"],
    "alternative": ["\u7ad6\u7701\u7565\u53f7"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\vdots"}
  },
  "ddots": {
    "comment": ["斜省略号"],
    "alternative": ["\u659c\u7701\u7565\u53f7"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\ddots"}
  },
  "frown": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\frown"}
  },
  "/_\\": {
    "_comment": "special case - will be incorrectly interpreted with left-to-right searching algorithm",
    "alternative": ["triangle"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\triangle"}
  },
  "diamond": {
    "comment": ["菱形"],
    "alternative": ["\u83f1\u5f62"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\diamond"}
  },
  "square": {
    "comment": ["方形", "正方形"],
    "alternative": ["\u65b9\u5f62", "\u6b63\u65b9\u5f62"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\square"}
  },
  "|_": {
    "alternative": ["lfloor"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\lfloor"}
  },
  "_|": {
    "alternative": ["rfloor"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\rfloor"}
  },
  "|~": {
    "alternative": ["lceling"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\lceiling"}
  },
  "~|": {
    "alternative": ["rceiling"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\rceiling"}
  },
  "CC": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mathbb{C}"}
  },
  "NN": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mathbb{N}"}
  },
  "QQ": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mathbb{Q}"}
  },
  "RR": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mathbb{R}"}
  },
  "ZZ": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\mathbb{Z}"}
  },
  "sqrt": {
    "_comment": "fix this one and below",
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\sqrt{}"}
  },
  "root": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\root{}{}"}
  },
  "int": {
    "alternative": ["integral"],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\int"}
  },
  "oint": {
    "alternative": [],
    "type": "symbol",
    "priority": -1,
    "rule": {"1,1": "\\oint"}
  },
  "cardinality": {
    "comment": ["基数"],
    "alternative": ["card", "\u57fa\u6570"],
    "type": "function",
    "priority": 55,
    "rule": {"1,2": "|#2|"}
  },
  "abs": {
    "comment": ["绝对值"],
    "alternative": ["absolute", "\u7edd\u5bf9\u503c"],
    "type": "function",
    "priority": 55,
    "rule": {"1,2": "|#2|"}
  },
  "sum": {
    "comment": ["总和", "求和"],
    "alternative": ["summation", "\u603B\u548C", "\u6C42\u548C"],
    "type": "function",
    "priority": 55,
    "rule": {"1,2": "\\sum #2"}
  },
}