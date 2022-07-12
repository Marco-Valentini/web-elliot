"""
Module description:

"""

__version__ = '0.3.1'
__author__ = 'Vito Walter Anelli, Claudio Pomo'
__email__ = 'vitowalter.anelli@poliba.it, claudio.pomo@poliba.it'

import copy
import os
import re
from ast import literal_eval
from collections import OrderedDict
from functools import reduce
from os.path import isfile, join
from types import SimpleNamespace

from hyperopt import hp
from yaml import FullLoader as FullLoader
from yaml import load



regexp = re.compile(r'[\D][\w-]+\.[\w-]+')

_experiment = 'experiment'

_version = 'version'
_data_config = "data_config"
_splitting = "splitting"
_evaluation = "evaluation"
_prefiltering = "prefiltering"
_binarize = "binarize"
_negative_sampling = "negative_sampling"
_dataset = 'dataset'
_dataloader = 'dataloader'
_weights = 'path_output_rec_weight'
_performance = 'path_output_rec_performance'
_logger_config = 'path_logger_config'
_log_folder = 'path_log_folder'
_verbose = 'verbose'
_recs = 'path_output_rec_result'
_top_k = 'top_k'
_config_test = 'config_test'
_print_triplets = 'print_results_as_triplets'
_metrics = 'metrics'
_relevance_threshold = 'relevance_threshold'
_paired_ttest = 'paired_ttest'
_wilcoxon_test = 'wilcoxon_test'
_models = 'models'
_recommender = 'recommender'
_gpu = 'gpu'
_external_models_path = 'external_models_path'
_hyper_max_evals = 'hyper_max_evals'
_hyper_opt_alg = 'hyper_opt_alg'
_data_paths = 'data_paths'
_meta = 'meta'
_random_seed = 'random_seed'
_align_side_with_train = "align_side_with_train"


class NameSpaceModel:
    def __init__(self, config, base_folder_path_elliot, base_folder_path_config):
        self.base_namespace = SimpleNamespace()

        self._base_folder_path_elliot = base_folder_path_elliot
        self._base_folder_path_config = base_folder_path_config

        # self.config_file = open(config_path)
        # self.config = load(self.config_file, Loader=FullLoader)
        self.config = config

        os.environ['CUDA_VISIBLE_DEVICES'] = str(self.config[_experiment].get(_gpu, -1))

    @staticmethod
    def _set_path(config_path, local_path):
        if os.path.isabs(local_path):
            return os.path.abspath(local_path)
        else:
            if local_path.startswith((".", "..")) or regexp.search(local_path):
                # return f"{config_path}/{local_path}"
                return os.path.abspath(os.sep.join([config_path, local_path]))
            else:
                # the string is an attribute but not a path
                return local_path

    @staticmethod
    def _safe_set_path(config_path, raw_local_path, dataset_name):
        if isinstance(raw_local_path, str):
            local_path = raw_local_path.format(dataset_name)
            if os.path.isabs(local_path):
                return os.path.abspath(local_path)
            else:
                if local_path.startswith((".", "..")) or regexp.search(local_path):
                    return os.path.abspath(os.sep.join([config_path, local_path]))
                else:
                    # the string is an attribute but not a path
                    return local_path
        else:
            return raw_local_path

    def fill_base(self):
        self.config[_experiment][_dataloader] = self.config[_experiment].get(_dataloader, "DataSetLoader")

        setattr(self.base_namespace, _config_test, False)

        for p in [_data_config, _dataset, _dataloader, _splitting, _prefiltering, _binarize, _random_seed]:
            if p == _data_config:
                self.config[_experiment][p]["side_information"] = []
                self.config[_experiment][p][_dataloader] = self.config[_experiment][p].get(_dataloader,
                                                                                           "DataSetLoader")
                self.config[_experiment][p].update(
                    {k: self._safe_set_path(self._base_folder_path_config, v, self.config[_experiment][_dataset])
                     for k, v in self.config[_experiment][p].items()})
                setattr(self.base_namespace, p, SimpleNamespace(**self.config[_experiment][p]))

            elif p == _splitting and self.config[_experiment].get(p, {}):
                self.config[_experiment][p].update({k: self._safe_set_path(self._base_folder_path_config, v, self.config[_experiment][_dataset])
                                                    for k, v in self.config[_experiment][p].items()})
                test_splitting = self.config[_experiment][p].get("test_splitting", {})
                validation_splitting = self.config[_experiment][p].get("validation_splitting", {})

                if test_splitting:
                    test_splitting = SimpleNamespace(**test_splitting)
                    self.config[_experiment][p]["test_splitting"] = test_splitting

                if validation_splitting:
                    validation_splitting = SimpleNamespace(**validation_splitting)
                    self.config[_experiment][p]["validation_splitting"] = validation_splitting

                setattr(self.base_namespace, p, SimpleNamespace(**self.config[_experiment][p]))
            elif p == _prefiltering and self.config[_experiment].get(p, {}):

                if not isinstance(self.config[_experiment][p], list):
                    self.config[_experiment][p] = [self.config[_experiment][p]]

                preprocessing_strategies = [SimpleNamespace(**strategy) for strategy in self.config[_experiment][p]]
                self.config[_experiment][p] = preprocessing_strategies
                setattr(self.base_namespace, p, self.config[_experiment][p])

            # elif p == _negative_sampling and self.config[_experiment].get(p, {}):
            #     self.config[_experiment][p].update({k: self._safe_set_path(self._base_folder_path_config, v, self.config[_experiment][_dataset])
            #                                         for k, v in self.config[_experiment][p].items()})
            #     self.config[_experiment][p] = SimpleNamespace(**self.config[_experiment][p])
            #     if getattr(self.config[_experiment][p], 'strategy', '') == 'random':
            #         path = os.path.abspath(os.sep.join([self._base_folder_path_config, "..", "data",
            #                                              self.config[_experiment][_dataset], "negative.tsv"]))
            #         setattr(self.config[_experiment][p], 'file_path', path)
            #     setattr(self.base_namespace, p, self.config[_experiment][p])
            elif p == _random_seed:
                setattr(self.base_namespace, p, self.config[_experiment].get(p, 42))
            elif p == _binarize:
                setattr(self.base_namespace, p, self.config[_experiment].get(p, False))
            else:
                if self.config[_experiment].get(p):
                    setattr(self.base_namespace, p, self.config[_experiment][p])
