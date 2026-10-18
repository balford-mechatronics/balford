from __future__ import annotations

import unittest

from balfordtools.bend_allowance import bend_allowance_mm
from balfordtools.deep_draw import deep_draw_check
from balfordtools.material_weight import part_weight_grams
from balfordtools.stamping_force import blanking_force


class CalculatorTests(unittest.TestCase):
    def test_deep_draw_multi_stage(self) -> None:
        result = deep_draw_check(22, 45, 1.2)
        self.assertEqual(result.blank_diameter_mm, 66.7)
        self.assertEqual(result.draw_ratio, 3.03)
        self.assertEqual(result.verdict, "multi-stage")
        self.assertEqual(result.draw_force_estimate_kn, 77.3)

    def test_blanking_force(self) -> None:
        result = blanking_force(perimeter_mm=220, thickness_mm=1.5, uts_mpa=400)
        self.assertEqual(result.cutting_force_kn, 92.4)
        self.assertEqual(result.stripping_force_estimate_kn, 11.1)

    def test_bend_allowance(self) -> None:
        self.assertAlmostEqual(bend_allowance_mm(2, 1.5, 90), 4.319689898685965)

    def test_material_weight(self) -> None:
        self.assertEqual(part_weight_grams(380, 1.5, "steel"), 4.47)


if __name__ == "__main__":
    unittest.main()
