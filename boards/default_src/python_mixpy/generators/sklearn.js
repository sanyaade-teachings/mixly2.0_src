import Python from '../../python/python_generator';

export const sklearn_make_classification = function () {
    var value_n_samples = Python.valueToCode(this, 'n_samples', Python.ORDER_ATOMIC) || '100';
    var value_n_features = Python.valueToCode(this, 'n_features', Python.ORDER_ATOMIC) || '20';
    var value_n_informative = Python.valueToCode(this, 'n_informative', Python.ORDER_ATOMIC) || '2';
    var value_n_redundant = Python.valueToCode(this, 'n_redundant', Python.ORDER_ATOMIC) || '2';
    var value_n_repeated = Python.valueToCode(this, 'n_repeated', Python.ORDER_ATOMIC) || '0';
    var value_n_classes = Python.valueToCode(this, 'n_classes', Python.ORDER_ATOMIC) || '2';
    var value_n_clusters_per_class = Python.valueToCode(this, 'n_clusters_per_class', Python.ORDER_ATOMIC) || '2';
    var value_random_state = Python.valueToCode(this, 'random_state', Python.ORDER_ATOMIC) || 'None';
    Python.definitions_['import_sklearn_make_classification'] = 'from sklearn.datasets import make_classification';
    var code = 'make_classification(n_samples=' + value_n_samples + ',n_features=' + value_n_features + ',n_informative=' + value_n_informative + ',n_redundant=' + value_n_redundant + ',n_repeated=' + value_n_repeated + ',n_classes=' + value_n_classes + ',n_clusters_per_class=' + value_n_clusters_per_class + ',random_state=' + value_random_state + ')';
    return [code, Python.ORDER_ATOMIC];
};

//sklearn 生成回归样本
export const sklearn_make_regression = function () {
    var value_n_samples = Python.valueToCode(this, 'n_samples', Python.ORDER_ATOMIC) || '100';
    var value_n_features = Python.valueToCode(this, 'n_features', Python.ORDER_ATOMIC) || '100';
    var value_n_informative = Python.valueToCode(this, 'n_informative', Python.ORDER_ATOMIC) || '10';
    var value_n_targets = Python.valueToCode(this, 'n_targets', Python.ORDER_ATOMIC) || '1';
    var value_bias = Python.valueToCode(this, 'bias', Python.ORDER_ATOMIC) || '0.0';
    var value_noise = Python.valueToCode(this, 'noise', Python.ORDER_ATOMIC) || '0.0';
    var value_random_state = Python.valueToCode(this, 'random_state', Python.ORDER_ATOMIC) || 'None';
    Python.definitions_['import_sklearn_make_regression'] = 'from sklearn.datasets import make_regression';
    var code = 'make_regression(n_samples=' + value_n_samples + ',n_features=' + value_n_features + ',n_informative=' + value_n_informative + ',n_targets=' + value_n_targets + ',bias=' + value_bias + ',noise=' + value_noise + ',random_state=' + value_random_state + ')';
    return [code, Python.ORDER_ATOMIC];
};

//sklearn 生成聚类样本
export const sklearn_make_blobs = function () {
    var value_n_samples = Python.valueToCode(this, 'n_samples', Python.ORDER_ATOMIC) || '100';
    var value_n_features = Python.valueToCode(this, 'n_features', Python.ORDER_ATOMIC) || '2';
    var value_centers = Python.valueToCode(this, 'centers', Python.ORDER_ATOMIC) || 'None';
    var value_cluster_std = Python.valueToCode(this, 'cluster_std', Python.ORDER_ATOMIC) || '1.0';
    var value_center_box = Python.valueToCode(this, 'center_box', Python.ORDER_ATOMIC) || '(-10.0,10.0)';
    var value_shuffle = Python.valueToCode(this, 'shuffle', Python.ORDER_ATOMIC) || 'True';
    var value_random_state = Python.valueToCode(this, 'random_state', Python.ORDER_ATOMIC) || 'None';
    Python.definitions_['import_sklearn_make_blobs'] = 'from sklearn.datasets import make_blobs';
    var code = 'make_blobs(n_samples=' + value_n_samples + ',n_features=' + value_n_features + ',centers=' + value_centers + ',cluster_std=' + value_cluster_std + ',center_box=' + value_center_box + ',shuffle=' + value_shuffle + ',random_state=' + value_random_state + ')';
    return [code, Python.ORDER_ATOMIC];
};

//sklearn 加载数据集
export const sklearn_load = function () {
    var dropdown_type = this.getFieldValue('type');
    var text_name = this.getFieldValue('name');
    Python.definitions_['import_sklearn_datasets'] = 'from sklearn import datasets';
    var code = text_name + ' = datasets.' + dropdown_type + '()\n';
    return code;
};

//sklearn 获取特征值/标签值/标签/特征
export const sklearn_data_target = function () {
    var value_name = Python.valueToCode(this, 'name', Python.ORDER_ATOMIC) || 'iris';
    var dropdown_type = this.getFieldValue('type');
    var code = value_name + '.' + dropdown_type;
    return [code, Python.ORDER_ATOMIC];
};

//sklearn 数据集分割
export const sklearn_train_test_split = function () {
    var value_train_data = Python.valueToCode(this, 'train_data', Python.ORDER_ATOMIC) || 'iris_X';
    var value_train_target = Python.valueToCode(this, 'train_target', Python.ORDER_ATOMIC) || 'iris_y';
    var value_test_size = Python.valueToCode(this, 'test_size', Python.ORDER_ATOMIC) || '0.3';
    var value_rondom_state = Python.valueToCode(this, 'rondom_state', Python.ORDER_ATOMIC) || 'None';
    Python.definitions_['import_sklearn_train_test_split'] = 'from sklearn.model_selection import train_test_split';
    if (value_train_target == 'None')
        var code = 'train_test_split(' + value_train_data + ',test_size = ' + value_test_size + ',random_state = ' + value_rondom_state + ')';
    else
        var code = 'train_test_split(' + value_train_data + ',' + value_train_target + ',test_size = ' + value_test_size + ',random_state = ' + value_rondom_state + ')';
    return [code, Python.ORDER_ATOMIC];
};

//sklearn 数据集分割-无标签值
export const sklearn_train_test_split_no_target = function () {
    var value_train_data = Python.valueToCode(this, 'train_data', Python.ORDER_ATOMIC) || 'iris_X';
    var value_test_size = Python.valueToCode(this, 'test_size', Python.ORDER_ATOMIC) || '0.3';
    var value_rondom_state = Python.valueToCode(this, 'rondom_state', Python.ORDER_ATOMIC) || 'None';
    Python.definitions_['import_sklearn_train_test_split'] = 'from sklearn.model_selection import train_test_split';
    var code = 'train_test_split(' + value_train_data + ',test_size = ' + value_test_size + ',random_state = ' + value_rondom_state + ')';
    return [code, Python.ORDER_ATOMIC];
};

//sklearn 初始化线性回归
export const sklearn_LinearRegression = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var value_fit_intercept = Python.valueToCode(this, 'fit_intercept', Python.ORDER_ATOMIC) || 'True';
    var value_normalize = Python.valueToCode(this, 'normalize', Python.ORDER_ATOMIC) || 'False';
    var value_n_jobs = Python.valueToCode(this, 'n_jobs', Python.ORDER_ATOMIC) || 'None';
    Python.definitions_['import_sklearn_linear_model'] = 'from sklearn.linear_model import LinearRegression';
    var code = value_model_name + ' = LinearRegression(fit_intercept = ' + value_fit_intercept + ',normalize = ' + value_normalize + ',n_jobs = ' + value_n_jobs + ')\n';
    return code;
};

//sklearn 初始化岭回归
export const sklearn_Ridge = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var value_alpha = Python.valueToCode(this, 'alpha', Python.ORDER_ATOMIC) || '1.0';
    var value_fit_intercept = Python.valueToCode(this, 'fit_intercept', Python.ORDER_ATOMIC) || 'True';
    var value_normalize = Python.valueToCode(this, 'normalize', Python.ORDER_ATOMIC) || 'False';
    var value_max_iter = Python.valueToCode(this, 'max_iter', Python.ORDER_ATOMIC) || '300';
    var value_random_state = Python.valueToCode(this, 'random_state', Python.ORDER_ATOMIC) || 'None';
    Python.definitions_['import_sklearn_linear_model'] = 'from sklearn.linear_model import Ridge';
    var code = value_model_name + ' = Ridge(alpha = ' + value_alpha + ',fit_intercept = ' + value_fit_intercept + ',normalize = ' + value_normalize + ',max_iter = ' + value_max_iter + ',random_state = ' + value_random_state + ')\n';
    return code;
};

//sklearn 初始化决策树 分类/回归算法
export const sklearn_DecisionTreeClassifier_Regressor = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var dropdown_type = this.getFieldValue('type');
    var value_max_depth = Python.valueToCode(this, 'max_depth', Python.ORDER_ATOMIC) || 'None';
    var value_random_state = Python.valueToCode(this, 'random_state', Python.ORDER_ATOMIC) || 'None';
    Python.definitions_['import_sklearn_' + dropdown_type] = 'from sklearn.tree import ' + dropdown_type;
    var code = value_model_name + ' = ' + dropdown_type + '(max_depth = ' + value_max_depth + ',random_state = ' + value_random_state + ')\n';
    return code;
};

export const sklearn_RandomForestClassifier_Regressor = function () {
    var dropdown_type = this.getFieldValue('type');
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'Model';
    var value_n_estimators = Python.valueToCode(this, 'n_estimators', Python.ORDER_ATOMIC) || '100';
    var value_max_depth = Python.valueToCode(this, 'max_depth', Python.ORDER_ATOMIC) || 'None';
    var value_n_jobs = Python.valueToCode(this, 'n_jobs', Python.ORDER_ATOMIC) || 'None';
    var value_random_state = Python.valueToCode(this, 'random_state', Python.ORDER_ATOMIC) || 'None';
    Python.definitions_['import_sklearn_' + dropdown_type] = 'from sklearn.ensemble import ' + dropdown_type;
    var code = value_model_name + ' = ' + dropdown_type + '(n_estimators = ' + value_n_estimators + ',max_depth = ' + value_max_depth + ',n_jobs = ' + value_n_jobs + ',random_state = ' + value_random_state + ')\n';
    return code;
};

//sklearn 初始化K近邻 分类/回归算法
export const sklearn_KNeighborsClassifier_Regressor = function () {
    var dropdown_type = this.getFieldValue('type');
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var value_K = Python.valueToCode(this, 'K', Python.ORDER_ATOMIC) || '5';
    var value_n_jobs = Python.valueToCode(this, 'n_jobs', Python.ORDER_ATOMIC) || 'None';
    Python.definitions_['import_sklearn_' + dropdown_type] = 'from sklearn.neighbors import ' + dropdown_type;
    var code = value_model_name + ' = ' + dropdown_type + '(n_neighbors = ' + value_K + ',n_jobs = ' + value_n_jobs + ')\n';
    return code;
};

//sklearn 初始化高斯贝叶斯分类算法
export const sklearn_GaussianNB = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    Python.definitions_['import_sklearn_GaussianNB'] = 'from sklearn.naive_bayes import GaussianNB';
    var code = value_model_name + ' = GaussianNB()\n';
    return code;
};

//sklearn 初始K-均值聚类
export const sklearn_KMeans = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var value_n_clusters = Python.valueToCode(this, 'n_clusters', Python.ORDER_ATOMIC) || '8';
    var value_max_iter = Python.valueToCode(this, 'max_iter', Python.ORDER_ATOMIC) || '300';
    var value_random_state = Python.valueToCode(this, 'random_state', Python.ORDER_ATOMIC) || 'None';
    var value_n_jobs = Python.valueToCode(this, 'n_jobs', Python.ORDER_ATOMIC) || 'None';
    Python.definitions_['import_sklearn_KMeans'] = 'from sklearn.cluster import KMeans';
    var code = value_model_name + ' = KMeans(n_clusters = ' + value_n_clusters + ',max_iter = ' + value_max_iter + ',random_state = ' + value_random_state + ',n_jobs = ' + value_n_jobs + ')\n';
    return code;
};

//sklearn 训练模型
export const sklearn_fit = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var value_train_data = Python.valueToCode(this, 'train_data', Python.ORDER_ATOMIC) || 'X_train';
    var value_train_target = Python.valueToCode(this, 'train_target', Python.ORDER_ATOMIC) || 'y_train';
    if (value_train_target == 'None')
        var code = value_model_name + '.fit(' + value_train_data + ')\n';
    else
        var code = value_model_name + '.fit(' + value_train_data + ',' + value_train_target + ')\n';
    return code;
};

//sklearn 训练模型-无标签值
export const sklearn_fit_no_target = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var value_train_data = Python.valueToCode(this, 'train_data', Python.ORDER_ATOMIC) || 'X_train';
    var code = value_model_name + '.fit(' + value_train_data + ')\n';
    return code;
};

//sklearn 模型预测
export const sklearn_predict = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var value_train_data = Python.valueToCode(this, 'train_data', Python.ORDER_ATOMIC) || 'X_test';
    var code = value_model_name + '.predict(' + value_train_data + ')';
    return [code, Python.ORDER_ATOMIC];
};

//sklearn 计算模型得分
export const sklearn_score = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var value_train_data = Python.valueToCode(this, 'train_data', Python.ORDER_ATOMIC) || 'X_train';
    var value_train_target = Python.valueToCode(this, 'train_target', Python.ORDER_ATOMIC) || 'y_train';
    if (value_train_target == 'None')
        var code = value_model_name + '.score(' + value_train_data + ')';
    else
        var code = value_model_name + '.score(' + value_train_data + ',' + value_train_target + ')';
    return [code, Python.ORDER_ATOMIC];
};

//sklearn 计算模型得分-无标签值
export const sklearn_score_no_target = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var value_train_data = Python.valueToCode(this, 'train_data', Python.ORDER_ATOMIC) || 'X_train';
    var code = value_model_name + '.score(' + value_train_data + ')';
    return [code, Python.ORDER_ATOMIC];
};

//sklearn 线性回归 模型获取 斜率/截距
export const sklearn_coef_intercept = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var dropdown_type = this.getFieldValue('type');
    var code = value_model_name + '.' + dropdown_type;
    return [code, Python.ORDER_ATOMIC];
};

//sklearn K-均值聚类 模型获取 簇中心坐标/聚类后的标签/所有点到对应簇中心的距离平方和
export const sklearn_cluster_centers_labels_inertia = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var dropdown_type = this.getFieldValue('type');
    var code = value_model_name + '.' + dropdown_type;
    return [code, Python.ORDER_ATOMIC];
};

//sklearn 保存/加载模型
export const sklearn_save_load_model = function () {
    var value_model_name = Python.valueToCode(this, 'model_name', Python.ORDER_ATOMIC) || 'model';
    var dropdown_type = this.getFieldValue('type');
    var value_address = Python.valueToCode(this, 'address', Python.ORDER_ATOMIC) || 'D:/mixly/test.pkl';
    Python.definitions_['import_sklearn_joblib'] = 'from sklearn.externals import joblib';
    var code = '';
    if (dropdown_type == 'dump')
        code = 'joblib.dump(' + value_model_name + ',' + value_address + ')\n';
    else
        code = value_model_name + ' = joblib.load(' + value_address + ')\n';
    return code;
};